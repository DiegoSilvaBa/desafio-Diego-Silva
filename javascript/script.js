class Produto{

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
        let produto = this.lerDados();


        if(this.validarCampos(produto) == true){
            if(this.editId == null){
                this.adicionarProdutos(produto);
            } else {
                this.atualizar(this.editId, produto); 
            }
        }

        this.listarTabela();
        this.cancelar();
    }

    adicionarProdutos(produto){
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById("produto").value;
        produto.valorProduto = document.getElementById("valor").value;
        
        return produto;
    }

    validarCampos(produto){
        let msg = '';

        if(produto.nomeProduto == ''){
            msg += 'Informe o nome do produto \n'
        }
        if(produto.valorProduto == ''){
            msg += 'Informe o valor do produto \n'
        }
        if(msg != ''){
            alert(msg);
            return false;
        }

        return true;
    }

    listarTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acao = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valorProduto;

            let imgEdit = document.createElement('img');
            imgEdit.src = 'imagens/botao-editar.png';
            imgEdit.setAttribute("onclick","produto.prepEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

            let imgDel = document.createElement('img');
            imgDel.src = 'imagens/botao-apagar.png';
            imgDel.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acao.appendChild(imgEdit);
            td_acao.appendChild(imgDel);
        }
    }

    cancelar(){ 
        document.getElementById("produto").value = '';
        document.getElementById("valor").value = '';

        document.getElementById("btn1").innerText = "Salvar";
        this.editId = null;
    }

    deletar(id){
        
        if(confirm('Deseja realmente deletar o produto '+id+'?')){

            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }

    }

    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valorProduto = produto.valorProduto;
            }
        }
    }

    prepEdicao(dados){

        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valorProduto;

        document.getElementById('btn1').innerText = "Atualizar";
    }    

    validarCodigo(){
        let codigoProduto = ['cafe','chantily','suco','sanduiche','queijo','salgado','combo1','combo2'];
        let codigo = document.getElementById('produto');
    

        for (let i = 0; i < codigoProduto.length; i++) {
            if(codigoProduto[i].includes(codigo)){
                return true;
                break;
            }
        }
    }
}

var produto = new Produto();

/* Área de testes */




/* class Cardapio{

    constructor(codigo, descricao, valor){
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor = valor;
    }
}

let produtos_cardapio = []; 

    produtos_cardapio = new Cardapio('cafe','Café', 3.00)
    console.log(produtos_cardapio)
    produtos_cardapio.push('suco','Suco Natural', 6.20);
 */
/* let cafe = new Cardapio();
    cafe.codigo = 'cafe';
    cafe.descricao = 'Café';
    cafe.valor = 3.00;

let chantily = new Cardapio();
    chantily.codigo = 'chantily';
    chantily.descricao = 'Chantily (extra do Café)';
    chantily.valor = 1.50;

let suco = new Cardapio();
    suco.codigo = 'suco';
    suco.descricao = 'Suco Natural';
    suco.valor = 6.20;

let sanduiche = new Cardapio();
    sanduiche.codigo = 'sanduiche';
    sanduiche.descricao = 'Sanduíche';
    sanduiche.valor = 6.50;

let queijo = new Cardapio();
    queijo.codigo = 'queijo';
    queijo.descricao = 'Queijo (extra do Sanduíche)';
    queijo.valor = 2.00;

let salgado = new Cardapio();
    salgado.codigo = 'salgado';
    salgado.descricao = 'Salgado';
    salgado.valor = 7,25;

let combo1 = new Cardapio();
    combo1.codigo = 'combo1';
    combo1.descricao = '1 Suco e 1 Sanduíche';
    combo1.valor = 9.50;

let combo2 = new Cardapio();
    combo2.codigo = 'combo2';
    combo2.descricao = '1 Café e 1 Sanduíche';
    combo2.valor = 7.50; */

/* console.log(Cardapio.codigo); */