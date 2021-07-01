import jeans from '../../assets/images/jeans.jpg'
import shirts from '../../assets/images/shirts.jpg'
import tshirts from '../../assets/images/t-shirt.jpg'
import menshirt from '../../assets/images/shirt-men.jpg'
import mentshirt from '../../assets/images/t-shirt-men.jpg'
import womentshirt from '../../assets/images/t-shirt-women.jpg'
import kurtamen from '../../assets/images/kurta-men.jpg'
import kurtawomen from '../../assets/images/kurta-women.jpg'
const INITIAL_STATE = {
    sections: [
        {
            title: "Jeans",
            imageUrl: jeans,
            id: 1,
            linkUrl: "shop/jeans"
        },
        {
            title: "Shirts",
            imageUrl: shirts,
            id: 1,
            linkUrl: "shop/shirt"
        },
        {
            title: "T-Shirts",
            imageUrl: tshirts,
            id: 1,
            linkUrl: "shop/t_shirt"
        },
        {
            title: "Men Shirts",
            imageUrl: menshirt,
            id: 1,
            linkUrl: "shop/shirt_men"
        },
        {
            title: "Men T-Shirts",
            imageUrl:mentshirt,
            id: 1,
            linkUrl: "shop/t_shirt_men"
        },
        {
            title: "Women T-Shirts",
            imageUrl:womentshirt,
            id: 1,
            linkUrl: "shop/t_shirt_women"
        },
        {
            title: "Men Kurtas",
            imageUrl:kurtamen,
            id: 1,
            linkUrl: "shop/kurta_men"
        },
        {
            title: "Women Kurtas",
            imageUrl:kurtawomen,
            id: 1,
            linkUrl: "shop/kurta_women"
        },
        {
            title: "hats",
            imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
            id: 1,
            linkUrl: "shop/hats"
        },
        {
            title: "womens",
            imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
            size: "large",
            id: 4,
            linkUrl: "shop/women"
        },
        {
            title: "mens",
            imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
            size: "large",
            id: 5,
            linkUrl: "shop/men"
        }
    ]
}
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default directoryReducer