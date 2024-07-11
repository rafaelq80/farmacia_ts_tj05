import { Produto } from "./Produto";

export class Cosmetico extends Produto{
    
    private _fragancia: string;

	constructor(id: number, nome: string, tipo: number, preco: number, fragancia: string) {
        super(id, nome, tipo, preco);
		this._fragancia = fragancia;
	}

	public get fragancia(): string {
		return this._fragancia;
	}

	public set fragancia(value: string) {
		this._fragancia = value;
	}

    public visualizar(){
        super.visualizar();
        console.log(`\nFragância: ${this._fragancia}`);
    }
}