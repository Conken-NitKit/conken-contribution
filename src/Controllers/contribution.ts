import express from 'express';

const getTest = (req: express.Request, res: express.Response) => {
  res.send(req.query);
};

export const contributionController = {
  getTest,
};
