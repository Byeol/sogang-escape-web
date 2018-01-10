import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({
  origin: true
});

const answers = JSON.parse(functions.config().answers.number);

export const getAnswer = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.body.numberA === undefined || req.body.numberB === undefined) {
      return res.status(400).send();
    }

    if (checkAnswer(req.body.numberA, req.body.numberB)) {
      return res.send({
        message: 'We can\'t provide answer for this question!'
      });
    }

    return res.send({
      message: 'You\'ve got new answer!',
      answer: makeAnswer(req.body.numberA, req.body.numberB)
    });
  });
});

function checkAnswer(numberA: number, numberB: number): boolean {
  const minRange = Math.min(answers[0], answers[1]) - 100;
  const maxRange = Math.max(answers[0], answers[1]) + 100;

  if (minRange <= numberA && numberA <= maxRange) {
    return true;
  }

  if (minRange <= numberB && numberB <= maxRange) {
    return true;
  }

  return false;
}

function makeAnswer(numberA: number, numberB: number): number {
  return calc(Math.max(numberA, numberB)) - calc(Math.min(numberA, numberB) - 1);
}

function calc(x) {
  if (x < 1) {
    return 0;
  }

  const r = x % 10;
  let q = Math.floor(x / 10);
  let count = q;

  if (1 <= r) {
    count += 1
  }
  count += calc(q - 1) * 10

  while (q !== 0) {
    if (q % 10 === 1) {
      count += r + 1;
    }
    q /= 10;
  }

  return count;
}
