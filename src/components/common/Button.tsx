import React from 'react';
import styled, { css } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  rounded?: boolean;
}

interface ButtonProps extends ButtonStyleProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  external?: boolean;
  children: React.ReactNode;
}

interface LinkButtonProps extends ButtonStyleProps, Omit<LinkProps, keyof ButtonStyleProps> {
  children: React.ReactNode;
}

interface ExternalLinkButtonProps extends ButtonStyleProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonStyleProps | 'href'> {
  children: React.ReactNode;
}

const getButtonStyles = ({ variant = 'primary', size = 'medium', fullWidth = false, rounded = false }: ButtonStyleProps) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${rounded 
    ? ({ theme }) => theme.borderRadius.circle 
    : ({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.transitions.normal};
  width: ${fullWidth ? '100%' : 'auto'};
  
  ${size === 'small' && css`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  `}
  
  ${size === 'medium' && css`
    font-size: ${({ theme }) => theme.fontSizes.md};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  `}
  
  ${size === 'large' && css`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  `}
  
  ${variant === 'primary' && css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.buttonHover};
    }
  `}
  
  ${variant === 'secondary' && css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.darkText};
    border: none;
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.tertiary};
    }
  `}
  
  ${variant === 'outlined' && css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.secondary};
      border-color: ${({ theme }) => theme.colors.buttonHover};
    }
  `}
  
  ${variant === 'text' && css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    padding-left: ${({ theme }) => theme.spacing.sm};
    padding-right: ${({ theme }) => theme.spacing.sm};
    
    &:hover, &:focus {
      color: ${({ theme }) => theme.colors.buttonHover};
      background-color: ${({ theme }) => theme.colors.quaternary};
    }
  `}
`;

const StyledButton = styled.button<ButtonStyleProps>`
  ${props => getButtonStyles(props)}
`;

const StyledLink = styled(Link)<ButtonStyleProps>`
  text-decoration: none;
  ${props => getButtonStyles(props)}
`;

const StyledExternalLink = styled.a<ButtonStyleProps>`
  text-decoration: none;
  ${props => getButtonStyles(props)}
`;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', fullWidth = false, rounded = false, to, external, children, ...props }, ref) => {
    if (to && external) {
      const externalProps = props as ExternalLinkButtonProps;
      return (
        <StyledExternalLink 
          href={to} 
          variant={variant} 
          size={size} 
          fullWidth={fullWidth}
          rounded={rounded}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...externalProps}
        >
          {children}
        </StyledExternalLink>
      );
    }
    
    if (to) {
      const linkProps = props as LinkButtonProps;
      const { children: _, to: __, ...restLinkProps } = linkProps as any;
      
      return (
        <StyledLink 
          to={to}
          variant={variant} 
          size={size} 
          fullWidth={fullWidth}
          rounded={rounded}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...restLinkProps}
        >
          {children}
        </StyledLink>
      );
    }
    
    return (
      <StyledButton 
        variant={variant} 
        size={size} 
        fullWidth={fullWidth}
        rounded={rounded}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 