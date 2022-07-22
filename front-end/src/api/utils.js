export const ROLES = [
    {
        "name": "User",
        "public": "85daaf6f7055cd5736287faed9603d712920092c4f8fd0097ec3b650bf27530e"
    },
    {
        "name": "Admin",
        "public": "5966abd0cbfc86f98a186531b2b4ee5f6e910120ce13222f98207203dfc9a9a2"
    }
]

export function findPublic(allowedRoles) {
    var resTab = [];
    for (let i=0; i<ROLES.length; i++) {
        if (allowedRoles.includes(ROLES[i].name)) {
            resTab.push(ROLES[i].public);
        }
    }
    return resTab;
}

export function isLogged(cookie) {
    for (let i=0; i<ROLES.length; i++) {
        if (ROLES[i].public === cookie) {
            return true;
        }
    }
    return false;
}