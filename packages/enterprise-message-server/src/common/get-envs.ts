export default async function getEnvs() {
  let envs: any = {}
  try {
    const env = await import('../../env')
    envs = env.default
  } catch (err) {
    envs = process.env
  }
  return envs
}
