export function formatTime(value: string) {
  if (!value) return '';

  const [hour, minute] = value.split(':');

  if (Number(hour) >= 1 && Number(minute) === 0) {
    return `${hour} hora${Number(hour) > 1 ? 's' : ''}`;
  }

  if (Number(hour) >= 1 && Number(minute) >= 1) {
    return `${hour} hora${Number(hour) > 1 ? 's' : ''} e ${minute} minuto${
      Number(minute) > 1 ? 's' : ''
    }`;
  }

  if (Number(hour) === 0 && Number(minute) >= 1) {
    return `${minute} minuto${Number(minute) > 1 ? 's' : ''}`;
  }

  return '';
}
