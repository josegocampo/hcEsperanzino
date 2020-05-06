const db = require('../data/config');

async function getRp(projId){

    const pr = await db('project_resources as pr')
    .join('resources', 'resources.id', 'pr.resource_Id')
    .join('projects', 'projects.id', 'pr.project_Id')
    .select('projects.name as Project Name', 'resources.name as Resource Name', 'pr.resource_quantity as Resource Quantity')
    .where('project_Id', projId)

    return pr
};

module.exports = {
    getRp
};