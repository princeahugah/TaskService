pipeline {
  agent {
    node {
      label 'ci-node'
    }
  }
  stages {
    stage('Notify') {
      steps {
        script {
          def commitMessage = sh returnStdout: true, script: 'git log -1 | tail -1'
          env.GIT_COMMIT_MESSAGE = commitMessage.trim()
          slackSend color: "#439FE0", message: "Build Started:\n *#${env.BUILD_NUMBER}* - ${env.JOB_NAME}  (<${env.BUILD_URL}|open link>)  :shhh: :crossed_fingers:\n Git Commit Message: ${env.GIT_COMMIT_MESSAGE}", tokenCredentialId: "princetest"
        }
      }
    }

    stage('Prepare') {
      steps {
        git(url: 'https://github.com/princeahugah/TaskService.git', branch: 'master', credentialsId: 'github')
        script {
          def commitId = sh returnStdout: true, script: 'git log --format="%h" -n 1'
          def commitDate = sh returnStdout: true, script: 'git log --format="%aD" -n 1'
          env.GIT_COMMIT_ID = commitId.trim()
          env.GIT_COMMIT_DATE = commitDate.trim()
        }

        sh 'echo "COMMIT ID: ${GIT_COMMIT_ID}"'
        sh 'echo "COMMIT DATE: ${GIT_COMMIT_DATE}"'
        sh 'echo "COMMIT MESSAGE: ${GIT_COMMIT_MESSAGE}"'
        sh 'echo "GIT URL: ${GIT_URL}"'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn install --frozen-lockfile'
        sh '/usr/local/bin/sequelize-cli db:migrate'
        sh '/usr/local/bin/tsc && /usr/local/bin/pm2 start ./dist/src/index.js --name task-service'
        sh '/usr/local/bin/pm2 status'
        script {
          def status = sh returnStdout: true, script: 'pm2 status | grep task-service | wc -l'
          if (status == 0) {
            throw new Exception('An error may have occurred as the service could not start!')
          }
        }
        sh '/usr/local/bin/pm2 stop task-service'
      }
    }

    stage('Deploy') {
      steps {
        script {
          def remote = [:]
          remote.name = "app-svr"
          remote.host = "95.179.201.200"
          remote.allowAnyHosts = true

          withCredentials([sshUserPrivateKey(credentialsId: 'ad8b2c31-7748-4fff-aa77-e73935936334', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
            remote.user = userName
            remote.identityFile = identity

            stage("Setting up remote service") {
              sshCommand remote: remote, command: '''
                appPath=/opt/apps
                appdir=TaskService
                repo=git@github.com:princeahugah/TaskService.git

                cd $appPath
                if [[ -d "$appdir" ]]; then
                  cd "$appdir"
                  git pull
                else
                  git clone "$repo"
                  cd "$appdir"
                fi
                /usr/local/bin/pm2 stop task-service
                yarn install --frozen-lockfile
                /usr/local/bin/sequelize-cli db:migrate
                /usr/local/bin/pm2 start ./dist/src/index.js --name task-service
                /usr/local/bin/pm2 status
              '''
            }
          }
        }
      }
    }
  }

  post {
    failure {
      script {
        slackSend color: "#FF0000", message: "Build Failure:\n *#${env.BUILD_NUMBER}* - ${env.JOB_NAME}  (<${env.BUILD_URL}|open link>)  :exploding_head: :facepalmgif: :fart:\n Git Commit: ${env.GIT_COMMIT}", tokenCredentialId: "princetest"
      }
    }

    success {
      script {
        slackSend color: "#008B00", message: "Build Success:\n *#${env.BUILD_NUMBER}* - ${env.JOB_NAME}  (<${env.BUILD_URL}|open link>)  :dabbinggif: :beers-gif: :aaw_yeah:\n Git Commit: ${env.GIT_COMMIT}", tokenCredentialId: "princetest"
      }
    }
  }
}
