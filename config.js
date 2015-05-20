module.exports = {
    env: 'dev',// dev || prod || rct
    default_ansible_filename: 'test',
    prod: {
        ansible_path: '/local/mnt/ansible_roles/ansible-nxos/test'
    },
    dev: {
        ansible_path: './yaml/'
    },
    rct: {
        ansible_path: '/local/mnt/ansible_roles/ansible-nxos/test'
    }
};