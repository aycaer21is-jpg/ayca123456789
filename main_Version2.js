// main.js - renders TopoJSON using D3 + topojson-client
// Expects data/Iceland_admin_level_6.topojson to exist and contain at least one topology object.

const topojsonPath = './data/Iceland_admin_level_6.topojson';
const svg = d3.select('#map');
const width = +svg.attr('width') || svg.node().getBoundingClientRect().width;
const height = +svg.attr('height') || svg.node().getBoundingClientRect().height;
const tooltip = d3.select('#tooltip');
const infoBox = d3.select('#feature-info');
const fillModeSelect = document.getElementById('fill-mode');
const resetZoomBtn = document.getElementById('reset-zoom');

const g = svg.append('g').attr('id', 'layer-regions');

// projection and path
const projection = d3.geoMercator().translate([width/2, height/2]);
const path = d3.geoPath().projection(projection);

// color scale (categorical)
const color = d3.scaleOrdinal(d3.schemeTableau10);

// track current transform for reset
let currentTransform = d3.zoomIdentity;

// fetch the topojson
fetch(topojsonPath)
  .then(r => {
    if (!r.ok) throw new Error('Failed to load TopoJSON: ' + r.statusText);
    return r.json();
  })
  .then(topo => {
    // choose the first object available
    const objNames = Object.keys(topo.objects || {});
    if (objNames.length === 0) throw new Error('No topology objects found in the file.');
    const name = objNames[0];
    const geo = topojson.feature(topo, topo.objects[name]);

    // fit projection to data
    projection.fitSize([width, height], geo);

    // draw features
    const features = g.selectAll('path.region')
      .data(geo.features)
      .enter()
      .append('path')
      .attr('class', 'region')
      .attr('d', path)
      .attr('fill', d => color(d.id || d.properties.id || Math.random()));

    // hover tooltip and side info
    features
      .on('mousemove', (event, d) => {
        const [mx, my] = d3.pointer(event);
        tooltip
          .style('left', (event.pageX + 12) + 'px')
          .style('top', (event.pageY + 12) + 'px')
          .classed('hidden', false)
          .html(`<strong>${d.properties && (d.properties.name || d.properties.NAME || d.id) || d.id}</strong>`);
        infoBox.html(renderInfo(d));
      })
      .on('mouseout', () => {
        tooltip.classed('hidden', true);
        // keep side info, but you can clear if you prefer:
        // infoBox.text('Hover a region');
      })
      .on('click', (event, d) => {
        // zoom to clicked feature
        const [[x0,y0],[x1,y1]] = path.bounds(d);
        event.stopPropagation();
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1-x0) / width, (y1-y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );
      });

    // background click resets selection/tooltip
    svg.on('click', () => {
      tooltip.classed('hidden', true);
      // reset side info
      infoBox.text('Hover a region');
    });

    // initial legend/info
    infoBox.text('Hover a region');

    // update color mode control
    fillModeSelect.addEventListener('change', () => {
      const mode = fillModeSelect.value;
      if (mode === 'id') {
        features.transition().duration(400).attr('fill', d => color(d.id || d.properties.id || Math.random()));
      } else {
        // random color map
        features.transition().duration(400).attr('fill', () => d3.interpolateRainbow(Math.random()));
      }
    });

    resetZoomBtn.addEventListener('click', () => {
      svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity);
    });

    // zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 40])
      .on('zoom', (event) => {
        currentTransform = event.transform;
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

  })
  .catch(err => {
    console.error(err);
    d3.select('#feature-info').text('Error loading topology: ' + err.message);
  });

// simple info renderer
function renderInfo(feature){
  const props = feature.properties || {};
  const id = feature.id || props.id || '(no id)';
  const name = props.name || props.NAME || '(no name)';
  const extra = Object.keys(props).length > 0
    ? '<pre style="white-space:pre-wrap;margin:6px 0 0;font-size:0.85rem;color:#cfe7ee;">' + JSON.stringify(props, null, 2) + '</pre>'
    : '';
  return `<strong>${name}</strong><br/><small>id: ${id}</small>${extra}`;
}