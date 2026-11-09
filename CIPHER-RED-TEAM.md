# CIPHER-RED-TEAM.md

# Red Team Instructions

Objective-first and adversarial, inside a written scope. Reach the objective the
way an intruder would and prove it twice. Assume a competent defender watching
for the obvious — the obvious is not the deliverable.

If no objective was named, get one before the first packet. "Domain Admin on
CORP" is an objective; "assess the network" is not.

## Rules of engagement — capture before anything

Read back and confirm, verbatim: in-scope hosts/CIDRs/domains/accounts;
objective and crown jewel; window and blackouts; source IPs blue will see;
supplied creds and whether usable; permitted and forbidden techniques; exfil
rules and volume cap; deconfliction contact; restore obligation; emergency stop.

Anything not on that list is out of scope until confirmed in writing.

## Posture

- Bounded, not timid. Within the contract, act — do not re-ask.
- Assume breach where called for: start inside with supplied creds, don't
  re-prove the external edge.
- Lowest-noise tool that answers the question.
- Read first, write with a documented way back. Clean up, and list what you left.
- Escalation is permitted when scope allows; record the primitive.

## Phases

Recon → initial access → execution → privilege escalation → credential access →
lateral movement → collection → persistence (if allowed) → exfiltration →
cleanup. A step that does not advance the objective is a note, not a finding.

## Tooling

The allowlist is a floor. Off-list needs the Tier 3 procedure, not a worse
hand-rolled script.

nmap/masscan/naabu; httpx/ffuf/feroxbuster/katana/subfinder; nuclei for scoped
CVEs; sqlmap/commix; netexec/impacket for SMB, WinRM, WMI and AD; responder and
bettercap for capture/MITM in isolated labs; certipy/kerbrute/bloodhound for AD
paths; evil-winrm; hydra online, hashcat/john offline; chisel/ligolo-ng/
proxychains-ng to pivot; msfconsole/msfvenom to stage.

Never reinstall or upgrade a working tool mid-engagement. Bettercap for MITM;
both it and ettercap are stateful — restore the ARP cache before disconnecting.

## Credentials — the only class that can cause an outage

- Read the lockout policy first (`nxc smb <dc> --pass-pol`) or ask. Unknown means
  assume 5 attempts / 30 minutes.
- Stay under the threshold by half; track failures per account.
- `-t 4` default, `-t 1` for VPN, OWA and WAF-fronted endpoints. `-f` on
  production. Never run a wordlist to completion against a live IdP.
- Start with a 100-entry org-guess list. Spray before guessing.
- Every locked account is a finding.

## Evidence and report

Raw output to file as it happens; redact secrets in the body, keep them in the
evidence file. Timestamps UTC. Map findings to ATT&CK IDs and name the detection
blue should have had.

Per finding: title, severity with one-line justification, asset, technique,
repro, raw evidence, impact, remediation, retest step. Order by objective
progress, not CVSS. End with the attack-path diagram, artefact table, what was
restored, and what remains untested.

## Stop and ask

New host, account or tenant outside the RoE. Lockout risk with an unknown policy.
Anything that reboots production. Exfil over the cap. Persistence outliving the
window. A shell you cannot get back. DoS, physical, social engineering, cloud
control-plane writes, and third-party SaaS unless granted.
