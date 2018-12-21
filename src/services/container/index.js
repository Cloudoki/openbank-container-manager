const fse = require('fs-extra')
const admZip = require('adm-zip')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const dockerConfig = require('../../config').get('dockerhub')
const kongConfig = require('../../config').get('kong')
const authConfig = require('../../config').get('auth')
const log = require('../../utils/logger')
const dockerCli = require('docker-cli-js')

const Docker = dockerCli.Docker

const docker = new Docker()

exports = module.exports = {}

exports.buildImage = async (imageName, archive, targetPath) => {

	log.debug(`building image: ${imageName}`)

	try {

		log.debug('empty target directory')
		await fse.emptyDir(targetPath)

		const zip = new admZip(archive)

		log.debug('extracting files')
		zip.extractAllTo(targetPath, true)

		log.debug('building image')
		await exec(`docker build -t cloudokihub/${imageName} -f ${targetPath}Dockerfile ${targetPath}`)
		//const { stdout, stderr } = await exec(`docker build -t ${imageName} -f ${targetPath}Dockerfile ${targetPath}`)

		log.debug('logging into docker hub')
		await exec(`docker login -u ${dockerConfig.username} -p ${dockerConfig.password}`)

		log.debug('pushing image')
		await exec(`docker push cloudokihub/${imageName}`)

		log.debug('logging out from docker hub')
		await exec('docker logout')

		log.debug('deleting local image')
		await exec(`docker rmi cloudokihub/${imageName}`)

	} catch (err) {
		log.error(err)
		throw err
	}

}

exports.start = async (imageName, containerName) => {

	log.debug(`starting image: ${imageName}, with name: ${containerName}`)

	try {
		//const { stdout, stderr } = await exec(`docker build -t ${imageName} -f ${targetPath}Dockerfile ${targetPath}`)

		//log.debug('logging into docker hub')
		//await exec(`docker login -u ${dockerConfig.username} -p ${dockerConfig.password}`)

		log.debug('check if container is running')

		const runningList = await docker.command(`ps -f "name=${containerName}" -f "status=running"`)

		if (runningList.containerList.length > 0) return

		log.debug('check if container at least exists. Must be removed first.')

		const existingList = await docker.command(`ps --all -f "name=${containerName}"`)

		if (existingList.containerList.length > 0 ){
			await docker.command(`start ${containerName}`)

			return
		}

		log.debug('running image')
		//await exec(`docker run -d --name ${containerName} -e SANDBOX_AUTH_SERVER_URL=${authConfig.url} --network ${kongConfig.instance.network} cloudokihub/${dockerConfig.baseSandboxImage.name}:${imageName || dockerConfig.baseSandboxImage.version}`)
		await exec(`docker run -d --name ${containerName} -e SANDBOX_AUTH_SERVER_URL=${authConfig.url} --network ${kongConfig.instance.network} ${dockerConfig.baseSandboxImage.fullName}`)

		//log.debug('logging out from docker hub')
		//await exec('docker logout')

	} catch (err) {
		log.error(err)
		throw err
	}

}
