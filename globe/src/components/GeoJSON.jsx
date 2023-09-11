import React from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import geoJson from '../data/ne_110m_admin_0_countries.json';

const vertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
void main() {
    gl_FragColor = vec4(229.0/255.0, 226.0/255.0, 218.0/255.0, 1.0);
}
`;

const lineFragmentShader = `
    void main() {
      gl_FragColor = vec4(251.0/255.0, 251.0/255.0, 240.0/255.0, 1.0);
    }
`;


function geoJsonToShape(geoJsonPolygon) {
    const shape = new THREE.Shape();

    for (let i = 0; i < geoJsonPolygon.length; i++) {
        const point = geoJsonPolygon[i];

        if (i === 0) {
            shape.moveTo(point[0], point[1]);
        } else {
            shape.lineTo(point[0], point[1]);
        }
    }

    return shape;
}

function projectVertexToSphere(longitude, latitude) {
  const longRad = longitude * (Math.PI / 180);
  const latRad = latitude * (Math.PI / 180);
  const radius = 1;

  const projected = {
      x: radius * Math.cos(latRad) * Math.cos(longRad),
      y: radius * Math.cos(latRad) * Math.sin(longRad),
      z: radius * Math.sin(latRad)
  };

  if (isNaN(projected.x) || isNaN(projected.y) || isNaN(projected.z)) {
      console.error(`Invalid projection for longitude=${longitude}, latitude=${latitude}. Result:`, projected);
  }

  return projected;
}



function createBorderLines(coords, borderLineWidth, offset, lineFragmentShader) {
  const points = [];

  for (let i = 0; i < coords[0].length; i++) {
      const point = coords[0][i];
      const projectedVertex = projectVertexToSphere(point[0], point[1]);
      points.push(new THREE.Vector3(projectedVertex.x * offset, projectedVertex.y * offset, projectedVertex.z * offset));
  }

  return (
    <Line
      points={points}
      fragmentShader={lineFragmentShader}
      lineWidth={borderLineWidth}
      key={`border-${Math.random()}`}
    />
  );
}

function processPolygon(coords, index, idx, borderLineWidth) {
  const shape = geoJsonToShape(coords[0]);

  const extrudeSettings = {
    depth: 0.03,
    bevelEnabled: false,
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const positionAttribute = geometry.attributes.position;
  const vertex = new THREE.Vector3();

  let maxZ = Number.NEGATIVE_INFINITY;
  
  for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      const projectedVertex = projectVertexToSphere(vertex.x, vertex.y);
      const scale = 1 + vertex.z;  // Adjust based on extrusion depth
  
      vertex.x = projectedVertex.x * scale;
      vertex.y = projectedVertex.y * scale;
      vertex.z = projectedVertex.z * scale;
  
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      
      if (vertex.z > maxZ) {
          maxZ = vertex.z;
      }
  }
  
  // Adjust top vertices to be convex
  for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      if (vertex.z >= maxZ) {
          const direction = vertex.clone().normalize();
          vertex.add(direction.multiplyScalar(0.01)); // Adjust scalar value for desired convexity
          positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
  }

  const key = idx !== undefined ? `${index}-${idx}` : index;
  const borderLinesRaised = createBorderLines(coords, borderLineWidth, 1.03, lineFragmentShader);

  return (
    <group key={key}>
      <mesh geometry={geometry}>
        <shaderMaterial 
            vertexShader={vertexShader} 
            fragmentShader={fragmentShader}
        />
      </mesh>
      {borderLinesRaised}
    </group>
  );
}

function convertGeoJsonToMeshes(feature, index, borderLineWidth) {
  const { geometry: featureGeometry } = feature;

  if (featureGeometry.type === "Polygon") {
      return processPolygon(featureGeometry.coordinates, index, null, borderLineWidth);
  } 
  else if (featureGeometry.type === "MultiPolygon") {
      // Flatten the multipolygon into individual polygon geometries
      return featureGeometry.coordinates.map((coords, idx) => 
          processPolygon(coords, index, idx, borderLineWidth)
      );
  }
}


export default function GeoJSON({ borderLineWidth }) {

  return (
    <group>
        {geoJson.features.map((feature, index) => convertGeoJsonToMeshes(feature, index, borderLineWidth))}
    </group>
  );
}
