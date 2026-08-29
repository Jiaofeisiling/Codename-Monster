export const getId = id => {
    const stringId = id;
    const decId = stringId.substring(4, 8);
    const intId = parseInt(decId, 16);
    return intId;
}

export default getId;