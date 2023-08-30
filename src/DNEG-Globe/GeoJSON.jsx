import React from 'react';
import * as THREE from 'three';
import geoJson from './ne_110m_admin_0_countries.json';

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

function projectVertexToSphere(x, y) {
  const long = x * (Math.PI / 180);
  const lat = y * (Math.PI / 180);
  const radius = 1;

  const projected = {
      x: radius * Math.cos(lat) * Math.sin(long),
      y: radius * Math.sin(lat),
      z: radius * Math.cos(lat) * Math.cos(long)
  };

  if (isNaN(projected.x) || isNaN(projected.y) || isNaN(projected.z)) {
      console.error(`Invalid projection for x=${x}, y=${y}. Result:`, projected);
  }

  return projected;
}

function createBorderLines(coords, offset, lineShader) {
  const vertices = [];

  for (let i = 0; i < coords[0].length; i++) {
      const point = coords[0][i];
      const projectedVertex = projectVertexToSphere(point[0], point[1]);
      vertices.push(projectedVertex.x * offset, projectedVertex.y * offset, projectedVertex.z * offset);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  return <line geometry={geometry} key={`border-${Math.random()}`}>
      <shaderMaterial vertexShader={vertexShader} fragmentShader={lineShader} />
  </line>;
}


function processPolygon(coords, index, idx) {
  const shape = geoJsonToShape(coords[0]);

  const extrudeSettings = {
    depth: 0.055,
    bevelEnabled: false,
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const positionAttribute = geometry.attributes.position;

  const vertex = new THREE.Vector3();
  for (let i = 0; i < positionAttribute.count; i++) {
    vertex.fromBufferAttribute(positionAttribute, i);
    
    const projectedVertex = projectVertexToSphere(vertex.x, vertex.y);
    const scale = 1 + vertex.z;  // Adjust based on extrusion depth

    vertex.x = projectedVertex.x * scale;
    vertex.y = projectedVertex.y * scale;
    vertex.z = projectedVertex.z * scale;

    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();  // Important for lighting

  const key = idx !== undefined ? `${index}-${idx}` : index;
  // const borderLines = createBorderLines(coords, 1, lineFragmentShader);
  const borderLinesRaised = createBorderLines(coords, 1.055, lineFragmentShader);


  return (
    <group key={key}>
      <mesh geometry={geometry}>
      <shaderMaterial 
            vertexShader={vertexShader} 
            fragmentShader={fragmentShader}
        />
      </mesh>
      {/* {borderLines} */}
      {borderLinesRaised}
    </group>
  );
}



function convertGeoJsonToMeshes(feature, index) {
  const { geometry: featureGeometry } = feature;

  if (featureGeometry.type === "Polygon") {
      return processPolygon(featureGeometry.coordinates, index);
  } 
  else if (featureGeometry.type === "MultiPolygon") {
      // Flatten the multipolygon into individual polygon geometries
      return featureGeometry.coordinates.map((coords, idx) => 
          processPolygon(coords, index, idx)
      );
  }
}


export default function GeoJSON() {
  return (
    <group>
      {geoJson.features.map((feature, index) => convertGeoJsonToMeshes(feature, index))}
    </group>
  );
}