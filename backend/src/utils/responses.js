export const success = (res, data = {}, message = 'OK', status = 200) => {
  return res.status(status).json({ success: true, message, data });
};

export const created = (res, data = {}, message = 'Creado exitosamente') => {
  return success(res, data, message, 201);
};

export const badRequest = (res, message = 'Solicitud inválida') => {
  return res.status(400).json({ success: false, message });
};

export const unauthorized = (res, message = 'No autorizado') => {
  return res.status(401).json({ success: false, message });
};

export const forbidden = (res, message = 'Acceso denegado') => {
  return res.status(403).json({ success: false, message });
};

export const notFound = (res, message = 'No encontrado') => {
  return res.status(404).json({ success: false, message });
};
