const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { Queue: QueueMQ, Worker } = require('bullmq');
const express = require('express');

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t * 1000));

const redisOptions = {
  port: 6379,
  host: 'localhost',
  password: 'root',
  tls: false,
};

const createQueueMQ = (name) => new QueueMQ(name, { connection: redisOptions });

// function setupBullMQProcessor(queueName) {
//   new Worker(
//     queueName,
//     async (job) => {
//       for (let i = 0; i <= 100; i++) {
//         await sleep(Math.random());
//         await job.updateProgress(i);
//         await job.log(`Processing job at interval ${i}`);

//         if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
//       }

//       return { jobId: `This is the return value of job (${job.id})` };
//     },
//     { connection: redisOptions }
//   );
// }

const run = async () => {
  const movieQueue = createQueueMQ('movie-queue');
  const ratingsQueue = createQueueMQ('rating-queue');

  // await setupBullMQProcessor(exampleBullMq.name);

  const app = express();

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/ui');

  createBullBoard({
    queues: [new BullMQAdapter(movieQueue), new BullMQAdapter(ratingsQueue)],
    serverAdapter,
  });

  app.use('/ui', serverAdapter.getRouter());

  app.use('/add', (req, res) => {
    const opts = req.query.opts || {};

    if (opts.delay) {
      opts.delay = +opts.delay * 1000; // delay must be a number
    }

    movieQueue.add('Add', { title: req.query.title }, opts);
    ratingsQueue.add('Add', { title: req.query.title }, opts);

    res.json({
      ok: true,
    });
  });

  app.listen(3001, () => {
    console.log('Running on 3001...');
    console.log('For the UI, open http://localhost:3001/ui');
    console.log('Make sure Redis is running on port 6379 by default');
    console.log('To populate the queue, run:');
    console.log('  curl http://localhost:3001/add?title=Example');
    console.log('To populate the queue with custom options (opts), run:');
    console.log('  curl http://localhost:3001/add?title=Test&opts[delay]=9');
  });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));
