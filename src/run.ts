import express from 'express';
import { Application } from './application';

class Service extends Application {
	setRoute() {
		this.router.get('/api/getTest', (req: express.Request, res: express.Response) => {
			res.send(req.query);
		});
	}
}

new Service().run();