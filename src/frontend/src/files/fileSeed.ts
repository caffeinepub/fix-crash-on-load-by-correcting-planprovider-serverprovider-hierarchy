import { FileNode } from '../servers/serverTypes';

export function getDefaultFileTree(): FileNode {
  return {
    name: 'root',
    type: 'folder',
    path: '/',
    updatedAt: Date.now(),
    children: [
      {
        name: 'plugins',
        type: 'folder',
        path: '/plugins',
        updatedAt: Date.now(),
        children: []
      },
      {
        name: 'world',
        type: 'folder',
        path: '/world',
        updatedAt: Date.now(),
        children: [
          {
            name: 'level.dat',
            type: 'file',
            path: '/world/level.dat',
            size: 2048,
            updatedAt: Date.now()
          }
        ]
      },
      {
        name: 'logs',
        type: 'folder',
        path: '/logs',
        updatedAt: Date.now(),
        children: [
          {
            name: 'latest.log',
            type: 'file',
            path: '/logs/latest.log',
            size: 15360,
            updatedAt: Date.now()
          }
        ]
      },
      {
        name: 'server.properties',
        type: 'file',
        path: '/server.properties',
        size: 1024,
        updatedAt: Date.now()
      }
    ]
  };
}
