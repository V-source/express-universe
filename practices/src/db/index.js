import { connect, connections, MongooseError, mongo, Error } from "mongoose";

export default async function dbConnection() {
  try {
    const con = await connect(process.env.MONGODB_UR0I, {
      serverSelectionTimeoutMS: 30000,
    });

    // console.log("Conectado exitosamente a la base de datos.");
    // console.log(connections[0])
    // connections[0].on("error", (err) => {
    //   console.log("Error de conexión a la base de datos:", err);
    // });

    // connections[0].on("disconnected", () => {
    //   console.log("Desconectado de la base de datos.");
    // });

    return cons;
  } catch (error) {
    console.info(error instanceof ReferenceError);
    console.info(error instanceof MongooseError);
    // console.log(MongooseError)
    // console.log(error)
    // console.log(error instanceof MongooseError);
    if(error.name === 'MongooseError') {
     return  console.error('ERROR DE MONGOOSE:\n', error.message)
    }
    if(error.name === 'ReferenceError') {
     return  console.log('error de referencia')
    }
    // console.log("Error al intentar conectar a la base de datos:", error);
  }
}

 // MongooseError: [class MongooseError extends Error] {
 //      messages: [Object],
 //      Messages: [Object],
 //      CastError: [class CastError extends MongooseError],
 //      DocumentNotFoundError: [class DocumentNotFoundError extends MongooseError],
 //      ValidationError: [class ValidationError extends MongooseError],
 //      ValidatorError: [class ValidatorError extends MongooseError],
 //      VersionError: [class VersionError extends MongooseError],
 //      ParallelSaveError: [class ParallelSaveError extends MongooseError],
 //      OverwriteModelError: [class OverwriteModelError extends MongooseError],
 //      MissingSchemaError: [class MissingSchemaError extends MongooseError],
 //      MongooseBulkSaveIncompleteError: [class MongooseBulkSaveIncompleteError extends MongooseError],
 //      MongooseServerSelectionError: [class MongooseServerSelectionError extends MongooseError],
 //      DivergentArrayError: [class DivergentArrayError extends MongooseError],
 //      StrictModeError: [class StrictModeError extends MongooseError],
 //      StrictPopulateError: [class StrictPopulateError extends MongooseError]

// SchemaTypeOptions: [class SchemaTypeOptions],
//     mongo: {
//       BSON: [Getter],
//       Binary: [Getter],
//       BSONRegExp: [Getter],
//       BSONSymbol: [Getter],
//       BSONType: [Getter],
//       Code: [Getter],
//       DBRef: [Getter],
//       Decimal128: [Getter],
//       Double: [Getter],
//       Int32: [Getter],
//       Long: [Getter],
//       MaxKey: [Getter],
//       MinKey: [Getter],
//       ObjectId: [Getter],
//       Timestamp: [Getter],
//       UUID: [Getter],
//       MongoBulkWriteError: [Getter],
//       ClientEncryption: [Getter],
//       ChangeStreamCursor: [Getter],
//       MongoAPIError: [Getter],
//       MongoAWSError: [Getter],
//       MongoAzureError: [Getter],
//       MongoBatchReExecutionError: [Getter],
//       MongoChangeStreamError: [Getter],
//       MongoClientBulkWriteCursorError: [Getter],
//       MongoClientBulkWriteError: [Getter],
//       MongoClientBulkWriteExecutionError: [Getter],
//       MongoClientClosedError: [Getter],
//       MongoCompatibilityError: [Getter],
//       MongoCursorExhaustedError: [Getter],
//       MongoCursorInUseError: [Getter],
//       MongoDecompressionError: [Getter],
//       MongoDriverError: [Getter],
//       MongoError: [Getter],
//       MongoExpiredSessionError: [Getter],
//       MongoGCPError: [Getter],
//       MongoGridFSChunkError: [Getter],
//       MongoGridFSStreamError: [Getter],
//       MongoInvalidArgumentError: [Getter],
//       MongoKerberosError: [Getter],
//       MongoMissingCredentialsError: [Getter],
//       MongoMissingDependencyError: [Getter],
//       MongoNetworkError: [Getter],
//       MongoNetworkTimeoutError: [Getter],
//       MongoNotConnectedError: [Getter],
//       MongoOIDCError: [Getter],
//       MongoOperationTimeoutError: [Getter],
//       MongoParseError: [Getter],
//       MongoRuntimeError: [Getter],
//       MongoServerClosedError: [Getter],
//       MongoServerError: [Getter],
//       MongoServerSelectionError: [Getter],
//       MongoStalePrimaryError: [Getter],
//       MongoSystemError: [Getter],
//       MongoTailableCursorError: [Getter],
//       MongoTopologyClosedError: [Getter],
//       MongoTransactionError: [Getter],
//       MongoUnexpectedServerResponseError: [Getter],
//       MongoWriteConcernError: [Getter],
//       configureExplicitResourceManagement: [Getter],
//       AbstractCursor: [Getter],
//       Admin: [Getter],
//       AggregationCursor: [Getter],
//       CancellationToken: [Getter],
//       ChangeStream: [Getter],
//       ClientSession: [Getter],
//       Collection: [Getter],
//       Db: [Getter],
//       ExplainableCursor: [Getter],
//       FindCursor: [Getter],
//       GridFSBucket: [Getter],
//       GridFSBucketReadStream: [Getter],
//       GridFSBucketWriteStream: [Getter],
//       ListCollectionsCursor: [Getter],
//       ListIndexesCursor: [Getter],
//       MongoClient: [Getter],
//       OrderedBulkOperation: [Getter],
//       UnorderedBulkOperation: [Getter],
//       BatchType: [Getter],
//       AutoEncryptionLoggerLevel: [Getter],
//       GSSAPICanonicalizationValue: [Getter],
//       AuthMechanism: [Getter],
//       Compressor: [Getter],
//       CURSOR_FLAGS: [Getter],
//       CursorTimeoutMode: [Getter],
//       MongoErrorLabel: [Getter],
//       ExplainVerbosity: [Getter],
//       ServerApiVersion: [Getter],
//       MongoLoggableComponent: [Getter],
//       SeverityLevel: [Getter],
//       ReturnDocument: [Getter],
//       ProfilingLevel: [Getter],
//       ReadConcernLevel: [Getter],
//       ReadPreferenceMode: [Getter],
//       ServerType: [Getter],
//       TopologyType: [Getter],
//       ReadConcern: [Getter],
//       ReadPreference: [Getter],
//       WriteConcern: [Getter],
//       CommandFailedEvent: [Getter],
//       CommandStartedEvent: [Getter],
//       CommandSucceededEvent: [Getter],
//       ConnectionCheckedInEvent: [Getter],
//       ConnectionCheckedOutEvent: [Getter],
//       ConnectionCheckOutFailedEvent: [Getter],
//       ConnectionCheckOutStartedEvent: [Getter],
//       ConnectionClosedEvent: [Getter],
//       ConnectionCreatedEvent: [Getter],
//       ConnectionPoolClearedEvent: [Getter],
//       ConnectionPoolClosedEvent: [Getter],
//       ConnectionPoolCreatedEvent: [Getter],
//       ConnectionPoolMonitoringEvent: [Getter],
//       ConnectionPoolReadyEvent: [Getter],
//       ConnectionReadyEvent: [Getter],
//       ServerClosedEvent: [Getter],
//       ServerDescriptionChangedEvent: [Getter],
//       ServerHeartbeatFailedEvent: [Getter],
//       ServerHeartbeatStartedEvent: [Getter],
//       ServerHeartbeatSucceededEvent: [Getter],
//       ServerOpeningEvent: [Getter],
//       TopologyClosedEvent: [Getter],
//       TopologyDescriptionChangedEvent: [Getter],
//       TopologyOpeningEvent: [Getter],
//       ServerSelectionEvent: [Getter],
//       ServerSelectionFailedEvent: [Getter],
//       ServerSelectionStartedEvent: [Getter],
//       ServerSelectionSucceededEvent: [Getter],
//       WaitingForSuitableServerEvent: [Getter],
//       SrvPollingEvent: [Getter],
//       MongoCryptAzureKMSRequestError: [Getter],
//       MongoCryptCreateDataKeyError: [Getter],
//       MongoCryptCreateEncryptedCollectionError: [Getter],
//       MongoCryptError: [Getter],
//       MongoCryptInvalidArgumentError: [Getter],
//       MongoCryptKMSRequestNetworkTimeoutError: [Getter],
//       MongoClientAuthProviders: [Getter]
//     },
