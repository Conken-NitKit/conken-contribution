import qs from 'querystring';

import axios from 'axios';

type NotifyParams = {
  message: string;
};

export abstract class LineNotifyClient {
  abstract notifyMessage(params: NotifyParams): void;
}

export class LineNotifyClientImpl {
  private serverLink: string;
  private authorization: string;
  constructor() {
    const token = process.env.LINE_NOTICE_TOKEN;

    this.serverLink = 'https://notify-api.line.me/api/notify';
    this.authorization = token ? `Bearer ${token}` : '';
  }

  notifyMessage(params: NotifyParams) {
    if (!params.message) {
      return;
    }

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.authorization,
      },
    };

    axios.post(this.serverLink, qs.stringify(params), options);
  }
}
