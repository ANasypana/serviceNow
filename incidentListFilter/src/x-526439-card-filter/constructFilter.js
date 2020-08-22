
export const updateFilter = (componentName, id, filter) =>{
	switch (componentName){
		case "state":{
			return {...filter, state: id === "all" ? "" : id}
		}
		case "updated":{
			return {...filter, updated: id === "all" ? "" : id}
		}
		case "field":{
			return {...filter, field: id}

		}
		default: return filter
	}

}

export const filterArray = (copyCards, filter) => {
	const newArray = copyCards
		.filter(card => filter.state.length > 0 ? card.state.toLowerCase() === filter.state : true )
		.filter(card => {
			if(!!filter.field.length && !!filter.inputVal){
				if(filter.field !== "short_description"){
					if(!!card[`${filter.field}`]["display_value"]){
						return card[`${filter.field}`]["display_value"].toLowerCase().includes(filter.inputVal.toLowerCase())
					}
					return false
				}
				return card["short_description"].toLowerCase().includes(filter.inputVal.toLowerCase())
			}
			return true
		});
	if(filter.updated.length > 0) {
		return newArray.sort((a, b) => filter.updated === "asc" ?
			(new Date(a["sys_updated_on"]) - new Date(b["sys_updated_on"])) :
			(new Date(b["sys_updated_on"]) - new Date(a["sys_updated_on"])))

	}
	return newArray
}
