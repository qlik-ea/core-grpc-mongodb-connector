const grpc = require('grpc');
const qlik = require('../src/qlik_grpc');

function test() {
  const client = new qlik.Connector('localhost:50051', grpc.credentials.createInsecure());

  const req = {
    connection: {
      connectionString: 'provider=mongodb-grpc-connector;hostname=mongodb-database',
      user: 'test',
      password: 'test',
    },
    sessionInfo: {
      user: '',
      sessionId: '',
      docId: '',
    },
    parameters: {
      statement: '{ "collection": "airports" }',
      statementParameters: '',
    },
  };

  const t0 = new Date().getTime();
  const call = client.getData(req);
  call.on('metadata', (metadata) => {
    const header = metadata.get('x-qlik-getdata-bin');
    if (header[0]) {
      const dataResponse = qlik.GetDataResponse.decode(header[0]);
      console.log(dataResponse);
    } else {
      console.log('No header');
    }
  });
  call.on('data', (data) => {
    console.log('Client received data', data.stringCodes.length);
  });
  call.on('end', () => {
    const t1 = new Date().getTime();
    console.log('Client ended on client side', t1 - t0, 'ms');
  });
}

test();
