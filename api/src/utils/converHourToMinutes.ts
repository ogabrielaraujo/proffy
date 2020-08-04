export default function convertHourToMinutes(time: string) {
  // 00:00
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}
