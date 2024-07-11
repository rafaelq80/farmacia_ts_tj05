import readlinesync = require("readline-sync");
import { colors } from "./src/util/Colors";
import { Medicamento } from "./src/model/Medicamento";
import { ProdutoController } from "./src/controller/ProdutoController";
import { Cosmetico } from "./src/model/Cosmetico";


export function main() {

    let opcao, id, tipo, preco: number;
    let nome, generico, fragancia: string;
    let tipoProduto = ['Medicamento', 'Cosmetico'];

    // Objeto da Classe ProdutoController
    const produtoController: ProdutoController = new ProdutoController();

    produtoController.cadastrar(new Medicamento(produtoController.gerarId(),
        "Tylenol 750 mg", 1, 45.00, "Paracetamol 750 mg"));

    produtoController.cadastrar(new Cosmetico(produtoController.gerarId(),
        "Rimel", 2, 60.00, "Neutra"));

    while (true) {

        console.log(colors.bg.black, colors.fg.green,
            "*****************************************************");
        console.log("                                                     ");
        console.log("                FARMÁCIA BEM ESTAR                   ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Produto                        ");
        console.log("            2 - Listar todos os Produtos             ");
        console.log("            3 - Buscar Produto por Id                ");
        console.log("            4 - Atualizar Dados do Produto           ");
        console.log("            5 - Apagar Produto                       ");
        console.log("            6 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ",
            colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao === 6) {
            console.log(colors.fg.greenstrong,
                "\nFarmácia Bem Estar - Remédio barato é aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,
                    "\n\nCriar Produto\n\n", colors.reset);

                nome = readlinesync.question("Digite o Nome do Produto: ");

                tipo = readlinesync.keyInSelect(tipoProduto, "", { cancel: false }) + 1;

                preco = readlinesync.questionFloat("Digite o preco: ");

                switch (tipo) {
                    case 1:
                        generico = readlinesync.question("Digite o Nome Generico do Medicamento: ");
                        produtoController.cadastrar(new Medicamento(produtoController.gerarId(),
                            nome, tipo, preco, generico));
                        break;
                    case 2:
                        fragancia = readlinesync.question("Digite a frangancia do Cosmetico: ");
                        produtoController.cadastrar(new Cosmetico(produtoController.gerarId(),
                            nome, tipo, preco, fragancia));
                        break;
                }

                keyPress()
                break;
            case 2:
                console.log(colors.fg.whitestrong,
                    "\n\nListar todos os Produtos\n\n", colors.reset);

                produtoController.listarTodas();

                keyPress()
                break;
            case 3:
                console.log(colors.fg.whitestrong,
                    "\n\nConsultar Produtos - por Id\n\n", colors.reset);

                id = readlinesync.questionInt("Digite o Id do Produto: ");
                produtoController.procurarPorId(id);

                keyPress()
                break;
            case 4:
                console.log(colors.fg.whitestrong,
                    "\n\nAtualizar dados do Produto\n\n", colors.reset);

                id = readlinesync.questionInt("Digite o Id do Produto: ");

                let produto = produtoController.buscarNoArray(id);

                if (produto !== null) {

                    nome = readlinesync.question("Digite o Nome do Produto: ");

                    tipo = produto.tipo;

                    preco = readlinesync.questionFloat("Digite o preco: ");

                    switch (tipo) {
                        case 1:
                            generico = readlinesync.question("Digite o Nome Generico do Medicamento: ");
                            produtoController.atualizar(new Medicamento(id,
                                nome, tipo, preco, generico));
                            break;
                        case 2:
                            fragancia = readlinesync.question("Digite a frangancia do Cosmetico: ");
                            produtoController.atualizar(new Cosmetico(id,
                                nome, tipo, preco, fragancia));
                            break;
                    }

                } else
                    console.log("Produto não Encontrado!")

                keyPress()
                break;
            case 5:
                console.log(colors.fg.whitestrong,
                    "\n\nApagar um Produto\n\n", colors.reset);

                id = readlinesync.questionInt("Digite o Id do Produto: ");
                produtoController.deletar(id);

                keyPress()
                break;
            default:
                console.log(colors.fg.whitestrong,
                    "\nOpção Inválida!\n", colors.reset);

                keyPress()
                break;
        }
    }

}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();