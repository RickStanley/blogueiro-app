export function isNavigationPath(path) {
    return !!path && !path.startsWith('javascript:void');
}

export function isExternalPath(path) {
    return /^https?:\/\//.test(path);
}

export function isApplicationPath(path) {
    return isNavigationPath(path) && !isExternalPath(path);
}