### Development Environment 

nvm --version -> 0.33.2

npm --version -> 5.3.0

node -v       -> v8.4.0

### TODO

- [x] Git Ignore env
- [x] NPM Init
- [x] Setup linting
- [x] Add Basic packages
- [x] Include Testing tools
- [x] Include Logging
- [x] Setup access logs
- [x] Create default route
- [x] Create Common Request Handler
- [x] Dockerize app
- [x] Session
- [x] Authentication
- [x] Project Structure
- [x] Developer flow
- [x] Setup Precommit checks
- [ ] HMR
- [ ] List down components
	- [ ] Unit tests
- [ ] Integration tests
- [ ] Tie logs to requestId
- [ ] Minimize and uglify

### Refer Log level from RFC 5424

| Level |          Status Type - Severity          |
|-------|:----------------------------------------:|
|   0   |       Emergency: system is unusable      |
|   1   |  Alert: action must be taken immediately |
|   2   |       Critical: critical conditions      |
|   3   |          Error: error conditions         |
|   4   |        Warning: warning conditions       |
|   5   | Notice: normal but significant condition |
|   6   |   Informational: informational messages  |
|   7   |        Debug: debug-level messages       |

Currently using only error, debug, notice and info
with the following use cases 

logger.log - something to log to console but need not be stored - keep these minimal

logger.debug - Should contain only useful information that might be required for debugging post-mortem

logger.error - If any error condition is met log it

logger.access - should not be used for anything else except access logs - more over not required by dev


### Instructions

1. Prefer string templates over concatenation

### Minor details

app.enable('trust proxy') - used to get correct values for client ip, protocol and setting them in req
                          - also used for session cookie because we are behind proxy/nginx

app.use(bodyParser.urlencoded({ extended: true })) - uses qs to process complex data structures if any

### Solve these

Move nodemonConfig into package.json

### Known issues

babel --copy-files doesn't seem to copy scss files for production
