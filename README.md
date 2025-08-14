iCloudPD Configurator

A lightweight, browser-based GUI to generate docker-compose.yaml and icloudpd.conf for the boredazfcuk/icloudpd Docker image.
Perfect for running iCloud photo sync on a Synology NAS or any Docker host without manually editing config files.

✨ Features
	•	Interactive form for all common icloudpd settings (Apple ID, paths, cron schedule, photo/video options, authentication, etc.)
	•	Generates:
	•	docker-compose.yaml – ready to deploy
	•	icloudpd.conf – ready to drop into /config
	•	Setup steps – including first-time --Initialise 2FA run
	•	Built with Vite + React + TypeScript
	•	Self-contained UI – no external CSS frameworks
	•	Ships with GitHub Actions workflow for free GitHub Pages hosting
