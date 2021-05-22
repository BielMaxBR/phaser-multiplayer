export default function() {
  let Client = io.connect(location.href)
  console.log('conectado')
  return Client
}