Quorum + Tessera local network scaffold

This folder contains a minimal scaffold to run a 3-node GoQuorum network with Tessera privacy managers and RAFT consensus for local development.

Files here:
- docker-compose.yml  : Docker Compose to start 3 Quorum nodes + 3 Tessera instances
- node1/, node2/, node3/: Data directories for geth (created on first run)
- tessera1/, tessera2/, tessera3/: Tessera config directories (you must supply tessera-config/tessera-public keys)

Quick start
1. Install Docker and Docker Compose.
2. From this folder run:

   docker-compose up -d

3. Generate/get enode addresses and Tessera public keys, then configure static-nodes.json and tessera config files in the tessera*/ and node*/ folders.

Notes
- This scaffold is intentionally minimal. You must generate keys and configs before the network will behave correctly.
- After booting, use Quorum RPC endpoints at http://localhost:22000, 22001, 22002 and Tessera at http://localhost:9001, 9002, 9003
- RAFT peer add steps must be executed via RPC once nodes are reachable.
