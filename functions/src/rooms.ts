import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({
  origin: true
});

export interface Room {
  name: string;
  password: number;
  locked: boolean;
}

export const checkPassword = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.body.roomId === undefined || req.body.password === undefined) {
      return res.status(400).send();
    }

    const roomDoc = admin.firestore().collection('rooms').doc(req.body.roomId);
    const room = (await roomDoc.get()).data() as Room;
    const password = (await admin.firestore().collection('passwords').doc(req.body.roomId).get()).data().password;
    const correct = password === Number.parseInt(req.body.password);

    if (!room.locked) {
      return res.send({
        message: 'Room is already unlocked!'
      });
    }

    if (correct) {
      await roomDoc.update({
        locked: false
      });
    }

    return res.send({
      message: correct ? 'Correct password. Room is unlocked now!' : 'Wrong password. Try again!',
      correct: correct
    });
  });
});

export const roomAnswersWrite = functions.firestore.document('/rooms/{roomId}/answers/{answerId}').onCreate(event => {
  const roomDoc = admin.firestore().collection('counts').doc(event.params.roomId);

  return admin.firestore().runTransaction(transaction =>
    transaction.get(roomDoc).then(doc => transaction.update(roomDoc, {
      answersCount: (doc.data().answersCount || 0) + 1
    }))
  );
});

export const roomOperationsWrite = functions.firestore.document('/rooms/{roomId}/operations/{operationId}').onCreate(event => {
  const roomDoc = admin.firestore().collection('counts').doc(event.params.roomId);

  return admin.firestore().runTransaction(transaction =>
    transaction.get(roomDoc).then(doc => transaction.update(roomDoc, {
      operationsCount: (doc.data().operationsCount || 0) + 1
    }))
  );
});
