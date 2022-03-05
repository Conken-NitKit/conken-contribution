import express from 'express';

export class Application {
  public host: string;
  public port: number;
  public app: express.Express;

  constructor(host?: string, port?: number) {
    this.host = host || 'localhost';
    this.port = port || 3000;
    this.app = express();

    this.app.set('host', this.host);
    this.app.set('port', this.port);

    // CORSの許可
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      next();
    });

    this.setRoute();
  }

  public setRoute() {
    throw new Error('Override method');
  }

  public run() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Example app listening on port ${this.host}:${this.port}!`);
    });
  }
}
