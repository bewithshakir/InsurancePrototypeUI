const  cartReducer = (state = [],action) => {
    switch(action.type){
        case "ADD" : 
        return [...state,action.payload];

        case "REMOVE" :
        const firstMatchingIndex = state.indexOf(action.payload);
        return state.filter((item,i) => i !== firstMatchingIndex);

        default:
        return state;
    }
}

export default cartReducer;