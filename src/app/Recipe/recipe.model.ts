import {Ingredient} from '../sharedmodel/ingredients.model';
export class Recipe {
    public name: string;
    public description: string;
    public image: string;
    public ingredients: Ingredient[];
    constructor(name: string, des: string, img: string, ingred: Ingredient[]) {
        this.name = name;
        this.description = des;
        this.image = img;
        this.ingredients = ingred;
    }
}
