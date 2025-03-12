function generateDXF(points) {
    let dxf = [];
    
    // Header with required sections
    dxf.push('0\nSECTION');
    dxf.push('2\nHEADER');
    dxf.push('9\n$ACADVER');
    dxf.push('1\nAC1009');
    dxf.push('0\nENDSEC');
    
    // Tables section
    dxf.push('0\nSECTION');
    dxf.push('2\nTABLES');
    dxf.push('0\nTABLE');
    dxf.push('2\nLTYPE');
    dxf.push('70\n1');
    dxf.push('0\nLTYPE');
    dxf.push('2\nCONTINUOUS');
    dxf.push('70\n64');
    dxf.push('3\nSolid line');
    dxf.push('72\n65');
    dxf.push('73\n0');
    dxf.push('40\n0.0');
    dxf.push('0\nENDTAB');
    dxf.push('0\nENDSEC');
    
    // Entities section
    dxf.push('0\nSECTION');
    dxf.push('2\nENTITIES');
    
    points.forEach(point => {
        // Point entity
        dxf.push('0\nPOINT');
        dxf.push('8\n0');  // Layer
        dxf.push('10\n' + point.easting);
        dxf.push('20\n' + point.northing);
        dxf.push('30\n' + point.elevation);
        
        // Description text - reordered group codes
        if (point.description && point.description.trim()) {
            dxf.push('0\nTEXT');
            dxf.push('8\n0');            // Layer
            dxf.push('39\n0.0');         // Thickness
            dxf.push('40\n0.25');        // Text height (moved up)
            dxf.push('10\n' + point.easting);    // First alignment point X
            dxf.push('20\n' + (point.northing + 0.5));  // First alignment point Y
            dxf.push('30\n' + point.elevation);  // First alignment point Z
            dxf.push('1\n' + point.description.trim());  // Text string
            dxf.push('50\n0.0');         // Text rotation
            dxf.push('41\n1.0');         // Text width factor
            dxf.push('51\n0.0');         // Oblique angle
            dxf.push('7\nSTANDARD');     // Text style
            dxf.push('71\n0');           // Text generation flags
            dxf.push('72\n0');           // Horizontal text justification
            dxf.push('73\n0');           // Vertical text justification
            dxf.push('11\n' + point.easting);    // Second alignment point X
            dxf.push('21\n' + (point.northing + 0.5));  // Second alignment point Y
            dxf.push('31\n' + point.elevation);  // Second alignment point Z
        }
    });
    
    dxf.push('0\nENDSEC');
    dxf.push('0\nEOF');
    
    return dxf.join('\n');
}
