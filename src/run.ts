import 'dotenv/config';

import { contributionRouter } from './Routes/github-contribution';
import { Application } from './application';

class Service extends Application {
  setRoute() {
    this.app.use(contributionRouter);
  }
}

new Service().run();
