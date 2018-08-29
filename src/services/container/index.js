const fse = require('fs-extra')
const admZip = require('adm-zip')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const dockerConfig = require('../../config').get('dockerhub')
const log = require('../../utils/logger')

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

		log.debug('logging into docker hub')
		await exec(`docker login -u ${dockerConfig.username} -p ${dockerConfig.password}`)

		log.debug('running image')
		await exec(`docker run -d --name ${containerName} --network kong-net cloudokihub/${imageName}`)

		log.debug('logging out from docker hub')
		await exec('docker logout')

	} catch (err) {
		log.error(err)
		throw err
	}

}
