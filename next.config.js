/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      const protoDir = path.join(process.cwd(), 'public', 'protos')
      const targetDirs = [
        path.join(process.cwd(), '.next', 'server', 'protos'),
        path.join(process.cwd(), '.next', 'server', 'app', 'protos'),
      ]

      const expectedFiles = [
        path.join(protoDir, 'core', 'v0', 'core.proto'),
        path.join(protoDir, 'platform', 'v0', 'platform.proto')
      ];

      const missingFiles = expectedFiles.filter(file => !fs.existsSync(file));

      if (!fs.existsSync(protoDir)) {
        console.error('Error: Directory with proto files not found:', protoDir);
        return config;
      }

      if (missingFiles.length > 0) {
        console.error('Error: The following proto files are missing:');
        missingFiles.forEach(file => console.error(`- ${file}`));
        return config;
      }

      try {
        for (const targetDir of targetDirs) {
          fs.mkdirSync(targetDir, { recursive: true });
          fs.cpSync(protoDir, targetDir,  { recursive: true });
          console.log('Proto files successfully copied from:', protoDir);
          console.log('To:', targetDir);
        }
      } catch (error) {
        console.error('Error copying proto files:', error);
      }
    }

    config.optimization = {minimize: false};

    return config;
  }
}

module.exports = nextConfig
