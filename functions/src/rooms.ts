import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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
