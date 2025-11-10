/**
 * Sistema de Notificaciones Toast
 * Wrapper personalizado para react-toastify
 */

import { toast as toastify } from 'react-toastify';

/**
 * Configuración por defecto para todos los toasts
 */
const defaultConfig = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

/**
 * Toast de éxito
 */
export const success = (message, options = {}) => {
  return toastify.success(message, {
    ...defaultConfig,
    ...options,
    icon: "✅",
  });
};

/**
 * Toast de error
 */
export const error = (message, options = {}) => {
  return toastify.error(message, {
    ...defaultConfig,
    autoClose: 6000, // Errores duran más
    ...options,
    icon: "❌",
  });
};

/**
 * Toast de advertencia
 */
export const warning = (message, options = {}) => {
  return toastify.warning(message, {
    ...defaultConfig,
    ...options,
    icon: "⚠️",
  });
};

/**
 * Toast informativo
 */
export const info = (message, options = {}) => {
  return toastify.info(message, {
    ...defaultConfig,
    ...options,
    icon: "ℹ️",
  });
};

/**
 * Toast de cargando (con promise)
 */
export const loading = (message, options = {}) => {
  return toastify.loading(message, {
    ...defaultConfig,
    autoClose: false,
    closeButton: false,
    ...options,
  });
};

/**
 * Toast con promise (maneja automáticamente loading/success/error)
 */
export const promise = (promiseFunction, messages = {}) => {
  return toastify.promise(
    promiseFunction,
    {
      pending: {
        render: messages.pending || 'Procesando...',
        icon: "🔄",
      },
      success: {
        render: messages.success || '¡Éxito!',
        icon: "✅",
      },
      error: {
        render: messages.error || 'Error al procesar',
        icon: "❌",
      }
    },
    defaultConfig
  );
};

/**
 * Actualizar un toast existente
 */
export const update = (toastId, options = {}) => {
  return toastify.update(toastId, {
    ...defaultConfig,
    ...options,
  });
};

/**
 * Cerrar un toast específico
 */
export const dismiss = (toastId) => {
  return toastify.dismiss(toastId);
};

/**
 * Cerrar todos los toasts
 */
export const dismissAll = () => {
  return toastify.dismiss();
};

/**
 * Toast personalizado para formularios
 */
export const formSuccess = (message = "Formulario enviado correctamente") => {
  return success(message, {
    icon: "📧",
  });
};

export const formError = (message = "Error al enviar el formulario") => {
  return error(message, {
    icon: "📝",
  });
};

/**
 * Toast para confirmaciones
 */
export const confirmation = (message, onConfirm, onCancel) => {
  const toastId = toastify.info(
    <div>
      <p>{message}</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={() => {
            onConfirm();
            dismiss(toastId);
          }}
          style={{
            padding: '6px 12px',
            background: '#0a3eb1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Confirmar
        </button>
        <button
          onClick={() => {
            onCancel && onCancel();
            dismiss(toastId);
          }}
          style={{
            padding: '6px 12px',
            background: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
    }
  );
  return toastId;
};

/**
 * Ejemplos de uso comunes
 */

// Ejemplo 1: Formulario de contacto
/*
import toast from './utils/toast';

const handleSubmit = async () => {
  const toastId = toast.loading('Enviando mensaje...');
  
  try {
    await sendMessage();
    toast.update(toastId, {
      render: '¡Mensaje enviado!',
      type: 'success',
      isLoading: false,
      autoClose: 4000,
    });
  } catch (error) {
    toast.update(toastId, {
      render: 'Error al enviar',
      type: 'error',
      isLoading: false,
      autoClose: 4000,
    });
  }
};
*/

// Ejemplo 2: Con promise automática
/*
import toast from './utils/toast';

toast.promise(
  sendMessage(),
  {
    pending: 'Enviando mensaje...',
    success: '¡Mensaje enviado!',
    error: 'Error al enviar'
  }
);
*/

// Ejemplo 3: Simple
/*
import toast from './utils/toast';

toast.success('¡Operación exitosa!');
toast.error('Ha ocurrido un error');
toast.warning('Ten cuidado con esto');
toast.info('Información importante');
*/

export default {
  success,
  error,
  warning,
  info,
  loading,
  promise,
  update,
  dismiss,
  dismissAll,
  formSuccess,
  formError,
  confirmation,
};

