export const newObject = (oldObject, updatedProperties )=>{
    return{
        ...oldObject,
        ...updatedProperties
    };
};