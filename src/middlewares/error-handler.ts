import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../types/Error'

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param request Request object provided by Express
 * @param response Response object provided by Express
 * @param next Used only to complete error middleware signature as described in documentation
 * http://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
 */
const errorHandler = (
  err: TypeError | CustomError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // Shouldn't get triggered never, just to avoid 'unused' warnings
  if (!err) next(err)
  let customError = err
  if (!(err instanceof CustomError)) {
    console.log('not custom error')
    customError = new CustomError({ status: 500, message: err.message })
  }

  response.status((customError as CustomError).status).json({
    message: (customError as CustomError).message,
    path: (customError as CustomError)?.path,
    type: (customError as CustomError)?.type,
  })
}

/*idea sobre manejo de errores que se puede ir implementando paulatinamente y en paralelo a la forma actual
los errores pueden tener codigos de error especificos para cada tipo
generar clase bien estructurada con los diferentes tipos de error
generar metodo que convierta un objeto a un mensaje de error de tal manera que pueda ser facilmente lanzado por yup, y al mismo tiempo sirva para ser cachado con el error handler y descomponerlo en 
=>sus distintas partes, esto seria util si queremos tener un mensaje de error que se pueda imprimir para el usuario y otro que no, asi como mas parametros que yup actualmente no maneja

En resumen, la idea general es tener homologados los mensajes de error, categorizarlos por tipos, opcionalmente ponerles codigos, y poder tener multiples mensajes en una sola cadena,
mandarlos llamar desde una clase bien estructurada en el espacio para escribir el mensaje de error personalizado por yup, retornaria una cadena con un formato especidfico (json.stringfy quiza??), esa cadena luego podria descomponerse
aqui en el error handler para poder mandar un objeto homologado de error al front y este pueda ver que mensaje le puede mandar al cliente en un toast por ejemplo, y cual nos sirve para debug de backend
*/


export default errorHandler
