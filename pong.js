// Definindo objetos para a bola e as raquetes
let bola, raqueteJogador, raqueteComputador;

// Definindo a altura das barras
let alturaBarra = 5;

function setup() {
  createCanvas(800, 600);

  // Inicializando a bola e as raquetes
  bola = new Bola();
  raqueteJogador = new Raquete(50);
  raqueteComputador = new Raquete(width - 50);
}

function draw() {
  background(0);

  // Desenha as barras
  fill(255);
  rect(0, 0, width, alturaBarra);
  rect(0, height - alturaBarra, width, alturaBarra);

  // Lógica da bola
  bola.mostra();
  bola.move();
  bola.bateParede();

  // Lógica da raquete do jogador
  raqueteJogador.mostra();
  raqueteJogador.move(mouseY);

  // Lógica da raquete do computador
  raqueteComputador.mostra();
  raqueteComputador.move(bola.y);

  // Verifica se a bola toca nas raquetes
  if (bola.tocaRaquete(raqueteJogador)) {
    raqueteComputador.objetivo = random(height);
  }

  if (bola.tocaRaquete(raqueteComputador)) {
    raqueteComputador.objetivo = random(height);
  }

  // Verifica se a bola saiu do campo
  if (bola.saiuDoCampo()) {
    bola = new Bola();
  }
}

// Classe Bola
// Classe Bola
class Bola {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.velocidadeX = 5 * (random() > 0.5 ? 1 : -1);
    this.velocidadeY = random(-3, 3);
    this.tamanho = 20;
  }

  mostra() {
    fill(255);
    ellipse(this.x, this.y, this.tamanho);
  }

  move() {
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
  }

  bateParede() {
    if (
      this.y - this.tamanho / 2 < alturaBarra ||
      this.y + this.tamanho / 2 > height - alturaBarra
    ) {
      this.velocidadeY *= -1;
    }
  }

  tocaRaquete(raquete) {
    if (
      this.x - this.tamanho / 2 < raquete.x + raquete.largura &&
      this.x + this.tamanho / 2 > raquete.x &&
      this.y - this.tamanho / 2 < raquete.y + raquete.altura / 2 &&
      this.y + this.tamanho / 2 > raquete.y - raquete.altura / 2
    ) {
      this.velocidadeX *= -1;
      return true;
    }
    return false;
  }

  saiuDoCampo() {
    return this.x - this.tamanho / 2 < 0 || this.x + this.tamanho / 2 > width;
  }
}

// Classe Raquete
class Raquete {
  constructor(x) {
    this.x = x;
    this.y = height / 2;
    this.altura = 100;
    this.largura = 20;
    this.objetivo = this.y;
  }

  mostra() {
    fill(255);
    rect(this.x, this.y - this.altura / 2, this.largura, this.altura);
  }

  move(novoY) {
    // Move a raquete diretamente para a posição do mouse, limitada pelas barras
    this.y = constrain(
      novoY,
      this.altura / 2 + alturaBarra,
      height - this.altura / 2 - alturaBarra
    );
  }
}
