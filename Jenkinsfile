pipeline {
    agent any

    stages {
        stage('update deploy file') {
            when {
                anyOf {
                  branch 'master';
                  branch 'dev';
                  branch 'jing';
                  branch 'jelly';
                  branch 'ptim';
                  branch 'wu';
                }
            }
            steps {
                sh 'cp /var/jenkins_home/deploy/fh-umi/deploy.sh .'
            }
        }
        stage('update code and build') {
            when {
                anyOf {
                  branch 'master';
                  branch 'dev';
                  branch 'jing';
                  branch 'jelly';
                  branch 'ptim';
                  branch 'wu';
                }
            }
            steps {
                sh 'chmod 700 ./deploy.sh'
                sh './deploy.sh ${BRANCH_NAME}'
            }
        }
    }
}
