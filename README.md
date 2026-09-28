# Them.Consulting


## Project Deployment and Branching Guidelines
## Site URLs
**Production Environment:**  
https://them.consulting

**UAT / Staging Environment:**  
https://d5jf4ou9mnbw.cloudfront.net

## Branching and Deployment Rules
To maintain a clean and reliable codebase, please strictly follow these rules:

**1. No Direct Pushes to dev or main Branches**
- Direct pushes to either the dev or main branches are strictly prohibited.

- All changes must be introduced via Pull Requests (PRs).

**2. Pull Request (PR) Process**
- Always create a PR when you want to merge your changes.

- Every PR must be reviewed and approved by at least one team member before merging.

- Self-merging without a review is not allowed.

**3. Deployment Process**
- **Merging into `dev` Branch:**

  - Once your PR is merged into the dev branch, the updated code is automatically deployed to the UAT/Staging environment.
(UAT URL: https://d5jf4ou9mnbw.cloudfront.net)

- **Merging into `main` Branch:**

  - Only the dev branch is allowed to merge into the main branch via a PR.

  - Once code is merged into main, it is automatically deployed to the Production environment.
(Production URL: https://them.consulting)

**4. Important Restrictions**
- Never directly push changes into the main branch.

- Never create a PR directly from a feature branch into main.

- Only merge dev → main after the code has been tested and verified on the UAT/Staging environment.

**5. Recommended Workflow**
Follow this branch flow for any new development:

```bash
feature/your-feature-name → dev → main
```
- Create a feature branch from dev.

- After development, create a PR from your feature branch into dev.

- Get your PR reviewed and approved.

- Once tested successfully in the UAT environment, create a PR from dev into main for production release.

