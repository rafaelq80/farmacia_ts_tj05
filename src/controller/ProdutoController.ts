import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";


export class ProdutoController implements ProdutoRepository {
   
    /**
     * Coleção Array que vai armazenar os Objetos Produto
     */ 
    private listaProdutos: Array<Produto> = new Array<Produto>();

    /**
     * Variável que vai controlar o Id dos Produtos
     */
    public id: number = 0;
   
    /**
     * Método Buscar Produto por Id
     */
    procurarPorId(id: number): void {
        
        /**
         *  Cria uma variável, chamada buscaProduto, que receberá o resultado do 
         *  método buscarNoArray().
         *  Como parâmetro do método buscarNoArray(), foi passado o parâmetro id, 
         *  enviado como parâmetro do Método procurarPorId()
         *  Caso o Produto seja encontrado, o Objeto será armazenado nesta variável
         */
        let buscaProduto = this.buscarNoArray(id);

        /**
         * Se o Produto procurado foi encontrado, exibe os dados do Objeto na tela, 
         * através do Método visualizar.
         * Caso contrário, Exibe a mensagem "Produto não encontrado"
         */
        if (buscaProduto !== null)
            buscaProduto.visualizar();
        else
            console.log("\nO Produto não foi encontrado!");
    }

    /**
     * Método Listar todos os Produtos
     */
    listarTodas(): void {

         /**
         * Através do Método for...of, percorre todo o array e exibe 
         * os dados de todos os Objetos na tela, através do Método visualizar().
         */
        for (let produto of this.listaProdutos) {
            produto.visualizar()
        }
    }

    /**
     * Método Cadastrar novo Produto
     */
    cadastrar(produto: Produto): void {

         /**
         * Recebe o Objeto produto, contendo todos os dados do Produto que
         * se deseja cadastrar e adiciona no array através do método push().
         * Na sequência, exibe a mensagem "Produto Cadastrado!"
         */
        this.listaProdutos.push(produto);
        console.log("\nO Produto foi cadastrada com sucesso!")
    }

    /**
     * Método Atualizar dados do Produto
     */
    atualizar(produto: Produto): void {

         /**
         *  Cria uma variável, chamada buscaProduto, que receberá o resultado do 
         *  método buscarNoArray(). 
         *  Como parâmetro do método buscarNoArray(), foi passado o atributo id do 
         *  Objeto produto, enviado como parâmetro do Método atualizar()
         *  Caso o Produto seja encontrado, o Objeto será armazenado nesta variável
         */
        let buscaProduto = this.buscarNoArray(produto.id);

         /**
         * Se o Produto procurado foi encontrado, atualiza os dados, 
         * através de uma atribuição direta no array.
         * Para identificar o indice do Objeto no array, foi utilizado o
         * método indexOf()
         * Caso contrário, Exibe a mensagem "Produto não encontrado"
         */
        if (buscaProduto !== null) {
            this.listaProdutos[this.listaProdutos.indexOf(buscaProduto)] = produto;
            console.log("\nO Produto foi atualizado!")
        } else
            console.log("\nO Produto não foi encontrado!");
    }

    /**
     * Método Deletar Produto
     */
    deletar(id: number): void {

        /**
         *  Cria uma variável, chamada buscaProduto, que receberá o resultado do 
         *  método buscarNoArray().
         *  Como parâmetro do método buscarNoArray(), foi passado o parâmetro id, 
         *  enviado como parâmetro do Método deletar()
         *  Caso o Produto seja encontrado, o Objeto será armazenado nesta variável
         */
        let buscaProduto = this.buscarNoArray(id);

        /**
         * Se o Produto procurado foi encontrado, deletaremos o Objeto do array, 
         * através do Método splice().
         * Para identificar o indice do Objeto no array, foi utilizado o
         * método indexOf(), no primeiro parâmetro do método splice()
         * No segundo parâmetro do método splice(), que indica quantos
         * objetos serão excluídos a partir do índice, passamos o valor 1,
         * ou seja, excluíremos apenas 1 Objeto 
         * Caso contrário, Exibe a mensagem "Produto não encontrado"
         */
        if (buscaProduto !== null) {
            this.listaProdutos.splice(this.listaProdutos.indexOf(buscaProduto), 1);
            console.log("\nO Produto foi excluído!")
        } else
            console.log("\nO Produto não foi encontrado!");
    }

    // Métodos Auxiliares

    /**
     * Método Gerar Id do Produto
     * Toda vez que formos cadastrar um novo Produto,
     * o método gerarId() criará um novo Id, usando uma 
     * sequência numérica simples
     */
    public gerarId(): number {
        return ++ this.id;
    }

    /**
     * Método Buscar Produto no Array
     * Através do Id, este método verificará se um Produto
     * existe.
     * Caso exista, será retornado o Objeto que contém os dados
     * do Produto.
     * Caso contrário, retirnará uma valor nulo
     */
    public buscarNoArray(id: number): Produto | null {

        for (let produto of this.listaProdutos) {
            if (produto.id === id)
                return produto;
        }

        return null;
    }
}