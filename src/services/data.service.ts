export const getAllMaids = () => {
    return getAllData('/data/maids.json');
}

export const getAllSpaces = () => {
    return getAllData('/data/spaces.json');
}

export const getAllCleanups = () => {
    return getAllData('/data/cleanups.json');
}

const getAllData = (path: RequestInfo | URL) => {
    return fetch(path)
    .then(response => {
        return response.json();
    }).then(data => {
        return data;
    }).catch((e:Error) => {
        console.log(e.message);
    })
}