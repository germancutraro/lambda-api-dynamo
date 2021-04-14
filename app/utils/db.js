const { DynamoDB, config } = require('aws-sdk');

config.update({ region: 'us-east-1' });
const documentClient = new DynamoDB.DocumentClient();
// const db = new DynamoDB({ apiVersion: '2012-10-08' });

const db = {
  async findAll(query) {
    const params = {
      TableName: query.table
      // IndexName: query.index,
      // KeyConditionExpression: `${query.queryKey} = :hkey`,
      // ExpressionAttributeValues: {
      //   ':hkey': query.queryValue
      // }
    };

    const res = await documentClient.query(params).promise();

    return res.Items || [];
  },
  // Find one
  async findById(query) {
    const params = {
      TableName: query.table,
      Key: {
        ID: query.id
      }
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item)
      throw Error(
        `There was an error fetching the data for ID of ${ID} from ${TableName}`
      );

    return data.Item;
  },
  // Create
  async create(query) {
    const params = {
      TableName: query.table,
      Item: query.body
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${query.body.ID} in table ${query.table}`
      );
    }

    return query.body;
  },
  async update(table) {},
  async destroy(table) {}
};

module.exports = db;
