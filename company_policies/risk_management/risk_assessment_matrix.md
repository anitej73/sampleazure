# Risk Assessment Matrix

## Risk Scoring Methodology

### Impact Levels
- **High (3)**: Significant operational disruption, financial loss >$100K, regulatory penalties
- **Medium (2)**: Moderate operational impact, financial loss $10K-$100K, compliance issues  
- **Low (1)**: Minor operational impact, financial loss <$10K, minimal compliance concerns

### Likelihood Levels
- **High (3)**: Very likely to occur (>70% probability)
- **Medium (2)**: Moderately likely to occur (30-70% probability)
- **Low (1)**: Unlikely to occur (<30% probability)

### Risk Matrix
| Impact → | Low (1) | Medium (2) | High (3) |
|----------|---------|------------|----------|
| **High (3)** | Medium (3) | High (6) | Critical (9) |
| **Medium (2)** | Low (2) | Medium (4) | High (6) |
| **Low (1)** | Low (1) | Low (2) | Medium (3) |

## Common Security Risks

### Authentication Risks
| Risk | Impact | Likelihood | Score | Controls |
|------|--------|------------|-------|----------|
| Weak passwords | High | High | 9 | IA-5, AC-2 |
| Missing MFA | High | Medium | 6 | IA-2(1), IA-2(2) |
| Shared accounts | Medium | Medium | 4 | AC-2(9) |

### Access Control Risks
| Risk | Impact | Likelihood | Score | Controls |
|------|--------|------------|-------|----------|
| Excessive privileges | High | Medium | 6 | AC-6, AC-6(7) |
| Orphaned accounts | Medium | High | 6 | AC-2, AC-2(3) |
| Privileged escalation | High | Low | 3 | AC-6(8), AC-6(10) |

### Data Protection Risks
| Risk | Impact | Likelihood | Score | Controls |
|------|--------|------------|-------|----------|
| Unencrypted data | High | Medium | 6 | SC-13, SC-28 |
| Data exfiltration | High | Low | 3 | AC-4, DLP controls |
| Backup failures | Medium | Medium | 4 | CP-9, CP-10 |

## Risk Treatment Options

### Critical (9): Immediate Action Required
- Executive escalation within 24 hours
- Emergency funding approval
- Temporary risk mitigation measures

### High (6): Action Required Within 30 Days  
- Department head approval for mitigation plan
- Budget allocation for controls
- Progress reporting to risk committee

### Medium (3-4): Action Required Within 90 Days
- Standard project management approach
- Regular progress updates
- Quarterly risk reviews

### Low (1-2): Monitor and Review
- Annual risk assessment updates
- Consider cost-effective controls
- Document acceptance rationale

## Risk Appetite Statement
The organization accepts:
- Low risks without additional controls
- Medium risks with documented mitigation plans
- High risks only with executive approval and timeline for reduction
- Critical risks require immediate mitigation

---
*Document Owner: Risk Management Office*
*Classification: Internal Use*  
*Approved By: Chief Risk Officer*
*Review Date: January 2026*
