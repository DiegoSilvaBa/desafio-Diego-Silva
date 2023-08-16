class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        this.arrayCardapio = ['cafe', 'chantily', 'suco', 'sanduiche', 'queijo', 'salgado', 'combo1', 'combo2'];
        this.cafeAdicionado = false;
        this.sanduicheAdicionado = false;
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validarCampos(produto) == true) {
            if (this.validarCodigo() == false) {
                alert('Código inexistente. Digite um código válido.');
                return;
            }

            if (this.editId == null) {
                this.adicionarProdutos(produto);
            } else {
                this.atualizar(this.editId, produto);
            }

            // Inserir a descrição do produto no campo "produto"
            let descricaoEValor = this.obterDescricaoEValor(produto.nomeProduto);
            document.getElementById('produto').value = descricaoEValor.descricao;

            // Calcular e inserir o valor no campo "quantidade"
            let quantidade = parseFloat(produto.valorProduto);
            let valorUnitario = descricaoEValor.valor;
            let valorTotal = quantidade * valorUnitario;
            document.getElementById('quantidade').value = valorTotal.toFixed(2); // Arredonda para 2 casas decimais
        }

        this.listarTabela();
        this.cancelar();
    }

    adicionarProdutos(produto) {
        produto.preco = parseFloat(produto.preco);

        if (produto.nomeProduto === 'cafe') {
            this.cafeAdicionado = true;
        } else if (produto.nomeProduto === 'sanduiche') {
            this.sanduicheAdicionado = true;
        }

        this.arrayProdutos.push(produto);
        this.id++;
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById("produto").value;
        produto.valorProduto = document.getElementById("quantidade").value;

        return produto;
    }

    validarCampos(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += 'Informe o nome do produto \n'
        }
        if (produto.valorProduto == '') {
            msg += 'Informe a quantidade do produto \n'
        }
        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    listarTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = ''; // Limpa o conteúdo do tbody

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = document.createElement('tr');

            let td_id = document.createElement('td');
            td_id.innerText = this.arrayProdutos[i].id;

            let td_produto = document.createElement('td');
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;

            let td_valor = document.createElement('td');
            td_valor.innerText = this.arrayProdutos[i].valorProduto;

            let td_acao = document.createElement('td');
            let imgEdit = document.createElement('img');
            imgEdit.src = 'imagens/botao-editar.png';
            imgEdit.setAttribute("onclick", "produto.prepEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");
            td_acao.appendChild(imgEdit);

            let imgDel = document.createElement('img');
            imgDel.src = 'imagens/botao-apagar.png';
            imgDel.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");
            td_acao.appendChild(imgDel);

            tr.appendChild(td_id);
            tr.appendChild(td_produto);
            tr.appendChild(td_valor);
            tr.appendChild(td_acao);

            tbody.appendChild(tr);
        }
    }

    validarCodigo() {
        let codigo = document.getElementById('produto').value;
        let teste = false;

        for (let i = 0; i < this.arrayCardapio.length; i++) {
            if (this.arrayCardapio[i] === codigo) {
                if (codigo === 'chantily' && !this.cafeAdicionado) {
                    alert('É necessário adicionar pelo menos um café antes de adicionar chantily.');
                    return false;
                }
                if (codigo === 'queijo' && !this.sanduicheAdicionado) {
                    alert('É necessário adicionar pelo menos um sanduíche antes de adicionar queijo.');
                    return false;
                }
                teste = true;
                break;
            }
        }

        return teste;
    }

    cancelar() {
        document.getElementById("produto").value = '';
        document.getElementById("quantidade").value = '';

        document.getElementById("btn1").innerText = "Salvar";
        this.editId = null;
    }

    deletar(id) {
        if (confirm('Deseja realmente deletar o produto ' + id + '?')) {
            let tbody = document.getElementById('tbody');
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valorProduto = produto.valorProduto;
            }
        }
    }

    prepEdicao(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('quantidade').value = dados.valorProduto;

        document.getElementById('btn1').innerText = "Atualizar";
    }

    obterDescricaoEValor(codigo) {
        let descricao = "";
        let valor = 0;

        // Defina as descrições e valores para cada código de produto
        switch (codigo) {
            case 'cafe':
                descricao = "Café";
                valor = 3.500;
                break;
            case 'chantily':
                descricao = "Chantilly (extra do café)";
                valor = 1.50;
                break;
            case 'suco':
                descricao = "Suco Natural";
                valor = 6.20;
                break;
            case 'sanduiche':
                descricao = "Sanduíche";
                valor = 6.50;
                break;
            case 'queijo':
                descricao = "Queijo (extra do sanduíche)";
                valor = 2.00;
                break;
            case 'salgado':
                descricao = "Salgado";
                valor = 7.25;
                break;
            case 'combo1':
                descricao = "1 Suco e 1 Sansuíche";
                valor = 9.50;
                break;
            case 'combo2':
                descricao = "1 Café e 1 Sanduíche";
                valor = 7.50;
                break;
            default:
                descricao = "Código inválido";
                valor = 0.00;
        }

        return { descricao, valor };
    }
}

var produto = new Produto();
