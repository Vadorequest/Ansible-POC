module.exports = {
    env: 'dev',
    default_ansible_filename: 'test',
    prod: {
        ansible_path: '/local/mnt/ansible_nxos/test/'
    },
    dev: {
        ansible_path: './yaml/'
    }
};